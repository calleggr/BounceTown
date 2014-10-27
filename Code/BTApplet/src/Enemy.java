import java.awt.Color;
import java.awt.Shape;
import java.awt.geom.Ellipse2D;
import java.awt.geom.Point2D;


public class Enemy implements Character {
	private double x;
	private double y;
	private double dx = -.3;
	private double dy = .2;
	private Color color;
	private double radius;
	private Shape shape;
	private boolean invincible;
	private double diameter;
	private int colorCounter = 0;
	
	public Enemy(double x, double y){
		this.x = x;
		this.y = y;
		this.color = Color.RED;
		this.radius = 40;
		this.diameter = 2*this.radius;
		this.shape = new Ellipse2D.Double(this.x,this.y,this.diameter,this.diameter);
	}
	
	@Override
	public void changeColor() {
		// TODO Auto-generated method stub
		this.colorCounter++;
		if(this.colorCounter == 450){
			this.colorCounter = 0;
			if(this.color == Color.RED){
				this.color = Color.BLACK;
			}else{
				this.color = Color.red;
			}
		}
		
		
	}

	@Override
	public void timePassed() {
		this.move();
		this.changeColor();
		
	}

	@Override
	public void move() {
		// TODO Auto-generated method stub
		this.x += this.dx;
		this.y += this.dy;
		if(this.x<0 || (this.x+(1.5*this.radius))>800){
			this.dx*=-1;
		}
		if((this.y<0) || (this.y+(2*this.radius))>800){
			this.dy*=-1;
		}
		this.shape = new Ellipse2D.Double(this.x,this.y,this.radius,this.radius);
	}

	@Override
	public Shape getShape() {
		// TODO Auto-generated method stub
		return this.shape;
	}

	@Override
	public Color getColor() {
		// TODO Auto-generated method stub
		return this.color;
	}

	@Override
	public Point2D getPoint() {
		// TODO Auto-generated method stub
		return new Point2D.Double(this.x+this.radius,this.y+this.radius);
	}

	@Override
	public int getRadius() {
		// TODO Auto-generated method stub
		return (int) (this.radius/2);
	}

}
